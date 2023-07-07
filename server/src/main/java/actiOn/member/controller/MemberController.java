package actiOn.member.controller;

import actiOn.Img.profileImg.ProfileImgDto;
import actiOn.member.dto.MemberPostDto;
import actiOn.member.entity.Member;
import actiOn.member.mapper.MemberMapper;
import actiOn.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping
@Validated
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    // 회원 가입
    @PostMapping("/signup")
    public ResponseEntity signupMember(@RequestBody @Valid MemberPostDto.Signup requestBody) {
        Member member = mapper.memberPostSignupToMember(requestBody);
        memberService.createMember(member);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 회원 프로필 사진 등록
    @PutMapping("/mypage/profile")
    public ResponseEntity uploadProfileImage(
            @RequestBody @Valid ProfileImgDto requestBody,
            Authentication authentication) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/mypage")
    public ResponseEntity updateMember(Authentication authentication) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // TODO 회원 프로필 사진 삭제

    // 마이페이지 - 회원 정보 조회
    @GetMapping("/mypage")
    public ResponseEntity getMemberInfo(Authentication authentication) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 마이페이지 - 사업자 정보 조히
    @GetMapping("/mypage/partner")
    public ResponseEntity getPartnerInfo(Authentication authentication) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 마이페이지 - 위시리스트 조회
    @GetMapping("/mypage/wishlist")
    public ResponseEntity getMemberWishlist(Authentication authentication) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 마이페이지 - 예약 정보 조회
    @GetMapping("/mypage/reservations")
    public ResponseEntity getMemberReservations(Authentication authentication) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 파트너 등록
    @PostMapping("/partners")
    public ResponseEntity registerPartner(Authentication authentication) {
        return new ResponseEntity(HttpStatus.CREATED);
    }

    // 마이페이지 - 판매 서비스 관리
    @GetMapping("/mystores")
    public ResponseEntity getPartnerStores(Authentication authentication) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 사업자 등록번호 검증
    @GetMapping("/partners/verify")
    public ResponseEntity verifyBusinessNumber(@RequestParam(name = "number") String businessNumber) {
        return ResponseEntity.ok().body(businessNumber);
    }
}
