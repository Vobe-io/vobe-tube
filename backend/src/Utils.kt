package vobe.io

import io.ktor.application.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.utils() {
    get("/health_check") {
        call.respond(mapOf("healthy" to true))
    }
}