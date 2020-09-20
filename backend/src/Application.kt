package vobe.io

import com.fasterxml.jackson.databind.SerializationFeature
import io.ktor.application.*
import io.ktor.features.*
import io.ktor.http.*
import io.ktor.jackson.*
import io.ktor.routing.*
import vobe.io.service.DatabaseFactory
import vobe.io.service.VideoService
import java.io.File
import java.io.IOException

fun Application.main() {
    install(CallLogging)
    install(CORS) {
        method(HttpMethod.Get)
        method(HttpMethod.Post)
        method(HttpMethod.Put)
        method(HttpMethod.Delete)
        anyHost()
        allowCredentials = true
    }
    install(ContentNegotiation) {
        jackson {
            enable(SerializationFeature.INDENT_OUTPUT)
        }
    }
    install(Compression) {
        default()
        excludeContentType(ContentType.Video.Any)
    }
    install(PartialContent)

    val config = environment.config.config("vobetube")

    val uploadDirPath: String = config.property("upload.dir").getString()
    val uploadDir = File(uploadDirPath)
    val videosDir = File("$uploadDirPath/videos")
    val thumbnailsDir = File("$uploadDirPath/thumbnails")
    if (!uploadDir.mkdirs() && !uploadDir.exists())
        throw IOException("Failed to create directory ${uploadDir.absolutePath}")
    if (!videosDir.mkdirs() && !videosDir.exists())
        throw IOException("Failed to create directory ${videosDir.absolutePath}")
    if (!thumbnailsDir.mkdirs() && !thumbnailsDir.exists())
        throw IOException("Failed to create directory ${thumbnailsDir.absolutePath}")

    DatabaseFactory.init()

    val videoService = VideoService()

    routing {
        video(videoService, uploadDir)
        utils()
        auth()
    }
}