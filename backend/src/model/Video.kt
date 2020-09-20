package vobe.io.model

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.`java-time`.datetime
import java.util.*

object Videos: Table() {
    val id = uuid("id")
    val name = varchar("name", 255).nullable()
    val description = text("description").nullable()
    val dateUpdated = datetime("dateUpdated")
    override val primaryKey = PrimaryKey(id)
}

data class Video(
    val id: UUID,
    val name: String?,
    val description: String?,
    val dateUpdated: String
)

data class NewVideo(
    val id: UUID = UUID.randomUUID(),
    val name: String?,
    val description: String?,
)