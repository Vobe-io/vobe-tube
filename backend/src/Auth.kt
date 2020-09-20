package vobe.io

import io.ktor.application.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.auth() {

    get("/register") {
        call.respondText("Register")
    }
    get("/login") {
        call.respondText("Login")
    }
}