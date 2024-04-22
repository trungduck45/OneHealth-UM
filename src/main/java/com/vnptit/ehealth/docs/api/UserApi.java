package com.vnptit.ehealth.docs.api;
import org.springframework.web.bind.annotation.*;

import com.vnptit.ehealth.docs.entities.UserEntity;
import com.vnptit.ehealth.docs.model.BaseResponse;
import com.vnptit.ehealth.docs.model.UserDto;
import com.vnptit.ehealth.docs.repository.UserRepository;
import com.vnptit.ehealth.docs.service.BaseService;
import com.vnptit.ehealth.docs.service.UserService;
import com.vnptit.ehealth.docs.utils.ContextUtil;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class UserApi extends BaseApi<UserEntity> {
    private final UserService userService;

    private final UserRepository userRepository;

    private final ContextUtil contextUtil;

    public UserApi(UserService userService, UserRepository userRepository, ContextUtil contextUtil) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.contextUtil = contextUtil;
    }

    @Override
    protected BaseService<UserEntity> getBaseService() {
        return userService;
    }

    @GetMapping("/info")
    public BaseResponse getUserInfo (){
        UserEntity entity = this.userRepository.getById(contextUtil.getUserId());
        UserDto dto = new UserDto();
        dto.setId(entity.getId());
        dto.setUsername(entity.getUsername());
        dto.setName(entity.getName());
        return new BaseResponse("00","Lấy thông tin người dùng thành công",dto);
    }
}
