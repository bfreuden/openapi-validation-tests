package bfreuden;

import io.micronaut.http.annotation.*;

@Controller("/shops/{shop}")
public class PetController {

    @Get(uri="/pets/{pet}", produces="application/json")
    public String getPet(String pet) {
        return "{ \"name\":\"" + pet + "\", \"age\": 5 }";
    }

    @Post(uri="/pets/_search", produces="application/json")
    public String searchPets() {
        return "{\"hits\": [{ \"name\": \"wolfie\", \"age\": 5 }]}";
    }

}
