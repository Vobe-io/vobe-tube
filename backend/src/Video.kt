package vobe.io

import io.ktor.application.*
import io.ktor.http.*
import io.ktor.http.content.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.coroutines.yield
import vobe.io.model.NewVideo
import vobe.io.service.VideoService
import java.io.File
import java.io.InputStream
import java.io.OutputStream
import java.lang.IllegalStateException
import java.util.*

fun Route.video(videoService: VideoService, uploadDir: File) {

    route("/video") {

        get("/") {
            call.respond(videoService.getAllVideos())
        }

        get("/{id}") {
            val id = UUID.fromString(call.parameters["id"]?: throw IllegalStateException("Must provide id"))
            val video = videoService.getVideo(id)
            if (video == null) call.respond(HttpStatusCode.NotFound)
            else call.respond(LocalFileContent(File("$uploadDir/videos", "${video.id}"), contentType = ContentType.Video.MP4))
        }

        get("/{id}/info") {
            val id = UUID.fromString(call.parameters["id"]?: throw IllegalStateException("Must provide id"))
            val video = videoService.getVideo(id)
            if (video == null) call.respond(HttpStatusCode.NotFound)
            else call.respond(HttpStatusCode.OK, video)
        }

        get("/thumbnail/{id}") {
            val id = UUID.fromString(call.parameters["id"]?: throw IllegalStateException("Must provide id"))
            val video = videoService.getVideo(id)
            if (video == null) call.respond(HttpStatusCode.NotFound)
            else call.respond(LocalFileContent(File("$uploadDir/thumbnails", "${video.id}"), contentType = ContentType.Image.PNG))
        }

        post("/") {
            val multipart = call.receiveMultipart()
            val id = UUID.randomUUID()
            var name = ""
            var description = ""

            multipart.forEachPart { part ->
                if (part is PartData.FormItem) {
                    if (part.name == "name") {
                        name = part.value
                    } else if (part.name == "description") {
                        description = part.value
                    }
                } else if (part is PartData.FileItem) {
                    val ext = File(part.originalFileName!!).extension
                    // Video Upload
                    if (part.name == "videoFile") {
                        val file = File("$uploadDir/videos", "$id")
                        part.streamProvider()
                            .use { its -> file.outputStream().buffered().use { its.copyToSuspend(it) } }
                    // Thumbnail Upload
                    } else if (part.name == "thumbnailFile") {
                        val file = File("$uploadDir/thumbnails", "$id")
                        part.streamProvider()
                            .use { its -> file.outputStream().buffered().use { its.copyToSuspend(it) } }
                    }
                }

                part.dispose()
            }

            call.respond(HttpStatusCode.Created, videoService.addVideo(NewVideo(id, name, description)))
        }

        put("/") {
            val video = call.receive<NewVideo>()
            val updated = videoService.updateVideo(video)
            if (updated == null) call.respond(HttpStatusCode.NotFound)
            else call.respond(HttpStatusCode.OK, updated)
        }

        delete("/{id}") {
            val id = UUID.fromString(call.parameters["id"]?: throw IllegalStateException("Must provide id"))
            val removed = videoService.deleteVideo(id)
            if (removed) call.respond(HttpStatusCode.OK)
            else call.respond(HttpStatusCode.NotFound)
        }
    }
}

suspend fun InputStream.copyToSuspend(
    out: OutputStream,
    bufferSize: Int = DEFAULT_BUFFER_SIZE,
    yieldSize: Int = 4 * 1024 * 1024,
    dispatcher: CoroutineDispatcher = Dispatchers.IO
): Long {
    return withContext(dispatcher) {
        val buffer = ByteArray(bufferSize)
        var bytesCopied = 0L
        var bytesAfterYield = 0L
        while (true) {
            val bytes = read(buffer).takeIf { it >= 0 } ?: break
            out.write(buffer, 0, bytes)
            if (bytesAfterYield >= yieldSize) {
                yield()
                bytesAfterYield %= yieldSize
            }
            bytesCopied += bytes
            bytesAfterYield += bytes
        }
        return@withContext bytesCopied
    }
}