package com.vnptit.ehealth.docs.api;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/danhmuc")
public class DanhmucApi {

    @GetMapping("/cashier")
    public String search(){
        return "<script>window.location.href='/danhmuc/posterminal'</script>";

    }

}
