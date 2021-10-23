import chai from "chai";
import chaiHttp from "chai-http";
import auth from "../src/middlewares/auth";
import sinon from "sinon";
import { after, afterEach, before, beforeEach, describe, it } from "mocha";
import {
    mockMovieTitle,
    mockUserId,
    MOVIE_ALREADY_EXISTS_RESPONSE,
    moviesTitles,
    NO_AUTH_TOKEN_ERROR_RESPONSE,
    NOT_ALLOWED_TO_CREATE_MOVIE_RESPONSE_OBJ, VALIDATION_ERROR_EXAMPLE
} from "./moviesApi.fixture";
import { createMovie, deleteMovies, stubAuthMiddleware } from "./__seeds__/movies.seeds";
import {
    BAD_REQUEST_CODE,
    CREATED_CODE,
    FORBIDDEN_CODE,
    SUCCESS_CODE,
    UNAUTHORIZED_CODE, VALIDATION_ERROR_CODE
} from "../src/appConfig/status-codes";
import { NOT_ALLOWED_TO_CREATE_MOVIE } from "../src/appConfig/constants";

chai.should();

chai.use(chaiHttp);


describe("GET /movies", () => {
    beforeEach(async (done) => {
        const authStub = sinon.stub(auth, "authMiddleware");
        authStub.callsFake(stubAuthMiddleware);
        done();
    });

    afterEach((done) => {
        auth.authMiddleware.restore();
        done();
    });

    before(async () => {
        return new Promise( async function (resolve) {
            // await createMovie({ title: mockMovieTitle, userId: mockUserId });
            resolve();
        });
    });
    
    after( async () => {
        return new Promise( async function (resolve) {
            await deleteMovies({ userId: mockUserId });
            resolve();
        });
    });

    it("Should return Auth error", (done) => {
        const { server } = require("../src");
        chai.request(server.app)
            .get("/api/movies")
            .end((_, response) => {
                response.should.have.status(UNAUTHORIZED_CODE);
                response.body.should.be.a("object");
                response.body.should.be.deep.equal(NO_AUTH_TOKEN_ERROR_RESPONSE);
                done();
            });
    });

    it("Should successfully create a movie", (done) => {
        const { server } = require("../src");
        chai.request(server.app)
            .post("/api/movies")
            .set("authorization", "Bearer simple")
            .send({ title: "Venom" })
            .end((_, response) => {
                response.should.have.status(CREATED_CODE);
                response.body.should.be.a("object");
                response.body.title.should.be.equal(mockMovieTitle);
                response.body.userId.should.be.equal(mockUserId);
                done();
            });
    });

    it("Should return movies of user", (done) => {
        const { server } = require("../src");
        chai.request(server.app)
            .get("/api/movies")
            .set("authorization", "Bearer simple")
            .end((_, request) => {
                request.should.have.status(SUCCESS_CODE);
                request.body.should.be.a("object");
                request.body.movies[0].title.should.be.equal(mockMovieTitle);
                request.body.movies[0].userId.should.be.equal(mockUserId);
                done();
            });
    });

    it("Should throw  already exists error", (done) => {
        const { server } = require("../src");
        chai.request(server.app)
            .post("/api/movies")
            .set("authorization", "Bearer simple")
            .send({ title: "Venom" })
            .end((err, response) => {
                console.log({ response });
                response.should.have.status(BAD_REQUEST_CODE);
                response.body.should.be.a("object");
                response.body.should.be.deep.equal(MOVIE_ALREADY_EXISTS_RESPONSE);
                done();
            });
    });

    it("Should throw  validation error", (done) => {
        const { server } = require("../src");
        chai.request(server.app)
            .post("/api/movies")
            .set("authorization", "Bearer simple")
            .send({ title: "V" })
            .end((err, response) => {
                response.should.have.status(VALIDATION_ERROR_CODE);
                response.body.should.be.a("object");
                response.body.should.be.deep.equal(VALIDATION_ERROR_EXAMPLE);
                done();
            });
    });

    it(`Should throw ${NOT_ALLOWED_TO_CREATE_MOVIE}`, () => {
        const { server } = require("../src");
        return new Promise(async (resolve) => {
            await Promise.all(moviesTitles.map(movieTitle => {
                return createMovie({
                    userId: mockUserId,
                    title: movieTitle
                });
            }));
            chai.request(server.app)
                .post("/api/movies")
                .set("authorization", "Bearer basic")
                .send({ title: "Batman" })
                .end((err, response) => {
                    response.should.have.status(FORBIDDEN_CODE);
                    response.body.should.be.a("object");
                    response.body.should.be.deep.equal(NOT_ALLOWED_TO_CREATE_MOVIE_RESPONSE_OBJ);
                    resolve();
                });
        });

    });

});
