package com.vnptit.ehealth.docs.api;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import com.vnptit.ehealth.docs.model.BaseResponse;
import com.vnptit.ehealth.docs.model.SearchReq;
import com.vnptit.ehealth.docs.service.BaseService;

import javax.validation.Valid;

public abstract class BaseApi<T> {

    protected abstract BaseService<T> getBaseService();

    @GetMapping("/search")
    // public BaseResponse search(){
    // return new BaseResponse("00","Lấy thành
    // công",this.getBaseService().search());
    // }
    public BaseResponse search(@Valid SearchReq req) {
        return new BaseResponse("00", "Lấy dữ liệu thành công", this.getBaseService().search(req));

    }

    @GetMapping("/all")
    public BaseResponse getAll() {
        return new BaseResponse("00", "Lấy dữ liệu thành công", this.getBaseService().search());

    }

    @PostMapping("/save")
    public BaseResponse create(@RequestBody T t) {
        return new BaseResponse("00", "Cập nhật dữ liệu thành công", this.getBaseService().create(t));
    }

    @PutMapping("/update")
    public BaseResponse update(@RequestBody T t) {
        return new BaseResponse("00", "Cập nhật thành công", this.getBaseService().update(t));
    }

    @GetMapping("/details/{id}")
    public BaseResponse update(@PathVariable Long id) {
        return new BaseResponse("00", "Lấy thành công", this.getBaseService().getById(id));
    }

    @GetMapping("/delete/{id}")
    public BaseResponse delete(@PathVariable Long id) {
        this.getBaseService().delete(id);
        return new BaseResponse("00", "Xóa thành công", id);
    }
}
