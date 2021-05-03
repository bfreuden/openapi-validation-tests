package bfreuden;

import io.vertx.core.Vertx;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.api.contract.openapi3.OpenAPI3RouterFactory;

public class Main {

    public static void main( String[] args ) {
        Vertx vertx = Vertx.vertx();
        int port = 8082;
        OpenAPI3RouterFactory.create(vertx, "src/main/openapi/openapi.json", ar -> {
            if (ar.succeeded()) {
                try {
                    OpenAPI3RouterFactory factory = ar.result();
                    factory.addHandlerByOperationId("getPet", Main::getPet);
                    factory.addHandlerByOperationId("searchPets", Main::searchPets);
                    Router router = factory.getRouter();
                    vertx.createHttpServer()
                            .requestHandler(router)
                            .listen(port);
                    System.out.println("Ready to serve on http://localhost:" + port);
                    System.out.println("Try:");
                    System.out.println(" curl localhost:" + port + "/shops/mine/pets/Wolfie");
                    System.out.println(" curl -XPOST localhost:" + port + "/shops/mine/pets/_search");

                } catch (Exception ex) {
                    ex.printStackTrace();
                    vertx.close();
                }
            } else {
                ar.cause().printStackTrace();
                vertx.close();
            }
        });
    }

    public static void getPet(RoutingContext rc) {
        rc.response().end(
                new JsonObject()
                        .put("name", rc.pathParam("pet"))
                        .put("age", 5)
                        .encodePrettily());
    }

    public static void searchPets(RoutingContext rc) {
        rc.response().end(
                new JsonObject()
                .put("hits",
                    new JsonArray()
                            .add(new JsonObject()
                                    .put("name", "Wolfie")
                                    .put("age", 5))).encodePrettily());
    }

}
