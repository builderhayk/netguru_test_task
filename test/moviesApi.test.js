import chai from "chai";
import chaiHttp from "chai-http";
import auth from "../src/middlewares/auth";
import sinon from "sinon";
import { describe, it, beforeEach, afterEach, before, after } from "mocha";
import {
    createMovie,
    deleteMovies,
    mockMovieTitle,
    mockUserId, MOVIE_ALREADY_EXISTS_RESPONSE,
    NO_AUTH_TOKEN_ERROR_RESPONSE
} from "./__seeds__/moviesApi.fixture";
import {BAD_REQUEST_CODE, SUCCESS_CODE, UNAUTHORIZED_CODE} from "../src/appConfig/status-codes";
import { REQUIRED } from "../src/appConfig/constants";
import {AuthError, BadRequest} from "../src/appConfig/errors";

chai.should();

chai.use(chaiHttp);


describe("GET /movies", () => {
    beforeEach(async (done) => {

        const authStub = sinon.stub(auth, "authMiddleware");
        authStub.callsFake(function (req, res, next) {
            try {
                const authHeaderContent = req.headers["authorization"];
                if (!authHeaderContent) {
                    throw new Error(REQUIRED("Authorization Header"));
                }
                req.user = {
                    userId: 114419845,
                    role: authHeaderContent.split(" ")[1] === "basic" ? "basic" : "premium",
                };
                next();
            } catch (e) {
                next(new AuthError(e.message));
            }
        });
        done();
    });

    afterEach((done) => {
        auth.authMiddleware.restore();
        done();
    });

    before(async () => {
        return new Promise( async function (resolve) {
            await createMovie({ title: mockMovieTitle, userId: mockUserId });
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
            .end((err, response) => {
                response.should.have.status(UNAUTHORIZED_CODE);
                response.body.should.be.a("object");
                response.body.should.be.deep.equal(NO_AUTH_TOKEN_ERROR_RESPONSE);
                done();
            });
    });


    it("Should return movies of user", (done) => {
        const { server } = require("../src");
        chai.request(server.app)
            .get("/api/movies")
            .set("authorization", "Bearer simple")
            .end((err, request) => {
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
                response.should.have.status(BAD_REQUEST_CODE);
                response.body.should.be.a("object");
                response.body.should.be.deep.equal(MOVIE_ALREADY_EXISTS_RESPONSE);
                done();
            });
    });

});
