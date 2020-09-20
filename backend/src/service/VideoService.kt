package vobe.io.service

import org.jetbrains.exposed.sql.*
import vobe.io.model.NewVideo
import vobe.io.model.Video
import vobe.io.model.Videos
import vobe.io.service.DatabaseFactory.dbQuery
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.time.format.FormatStyle
import java.util.*

class VideoService {

    suspend fun getAllVideos(): List<Video> = dbQuery {
        Videos.selectAll().map { toVideo(it) }
    }

    suspend fun getVideo(id: UUID): Video? = dbQuery {
        Videos.select {
            (Videos.id eq id)
        }.mapNotNull { toVideo(it) }
            .singleOrNull()
    }

    suspend fun updateVideo(video: NewVideo): Video? {
        val id = video.id
        return if (id == null) {
            addVideo(video)
        } else {
            dbQuery {
                Videos.update({Videos.id eq id}) {
                    it[name] = video.name
                    it[description] = video.description
                    it[dateUpdated] = LocalDateTime.now()
                }
            }
            getVideo(id)
        }
    }

    suspend fun addVideo(video: NewVideo): Video {
        var key = UUID.randomUUID()
        dbQuery {
            key = (Videos.insert {
                it[id] = video.id
                it[name] = video.name
                it[description] = video.description
                it[dateUpdated] = LocalDateTime.now()
            } get Videos.id)
        }
        return getVideo(key)!!
    }

    suspend fun deleteVideo(id: UUID): Boolean {
        return dbQuery {
            Videos.deleteWhere { Videos.id eq id} > 0
        }
    }

    private fun toVideo(row: ResultRow): Video =
        Video(
            id = row[Videos.id],
            name = row[Videos.name],
            description = row[Videos.description],
            dateUpdated = row[Videos.dateUpdated].format(DateTimeFormatter.ofLocalizedDate(FormatStyle.FULL))
        )
}