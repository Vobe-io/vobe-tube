package vobe.io

import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.auth.jwt.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.auth() {
    application.install(Authentication) {
        jwt {

        }
    }

    get("/register") {
        call.respondText("Register")
    }
    get("/login") {
        call.respondText("Login")
    }
}