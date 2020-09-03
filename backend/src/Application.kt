package vobe.io

import io.ktor.application.*
import io.ktor.features.*
import io.ktor.gson.*
import io.ktor.http.*
import io.ktor.routing.*

fun Application.main() {
    install(CallLogging)
    install(CORS) {
        method(HttpMethod.Get)
        method(HttpMethod.Post)
        anyHost()
        allowCredentials = true
    }
    install(ContentNegotiation) {
        gson {
            setPrettyPrinting()
        }
    }
    routing {
        utils()
        auth()
    }
}