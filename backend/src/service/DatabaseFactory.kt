package vobe.io.service

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction
import vobe.io.model.Videos

object DatabaseFactory {

    fun init() {

        Database.connect(hikari())
        transaction {
            SchemaUtils.create(Videos)
        }
    }

    private fun hikari(): HikariDataSource {
        val config = HikariConfig()
        config.jdbcUrl = "jdbc:pgsql://postgres/vobetube"
        config.maximumPoolSize = 3
        config.username = "postgres"
        config.password = "password"
        config.validate()
        return HikariDataSource(config)
    }

    suspend fun <T> dbQuery(
        block: suspend () -> T): T =
        newSuspendedTransaction { block() }
}