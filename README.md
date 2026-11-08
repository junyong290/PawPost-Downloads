# PawPost 1.1.0

**[다운로드 페이지](https://junyong290.github.io/PawPost-Downloads/)** — 친구에게 이 주소 하나를 보내세요.

파일은 놓기만 하세요. 나머지는 고양이가.

| 컴퓨터 | 설치 파일 |
|---|---|
| Windows 10/11 x64 | [Windows 설치 EXE](https://github.com/junyong290/PawPost-Downloads/releases/download/v1.1.0/PawPost-1.1.0-Windows-x64-Setup.exe) |
| Mac M시리즈 · M2 포함 · macOS 15 이상 | [Apple Silicon DMG](https://github.com/junyong290/PawPost-Downloads/releases/download/v1.1.0/PawPost-1.1.0-macOS-arm64.dmg) |
| Mac Intel · macOS 15 이상 | [Intel DMG](https://github.com/junyong290/PawPost-Downloads/releases/download/v1.1.0/PawPost-1.1.0-macOS-x64.dmg) |

개발 도구나 .NET SDK를 따로 설치할 필요가 없습니다. 이 공개 저장소는 다운로드 페이지와 설치 파일만 제공하며 앱 소스 저장소는 비공개로 유지합니다.

## 설치와 업데이트

Windows는 EXE를 실행합니다. Mac은 DMG 안의 PawPost를 Applications(응용 프로그램)로 복사합니다. 기존 PawPost는 ‘프로그램 종료’한 뒤 교체하세요.

기존 1.0.0 릴리스는 보존합니다. 계정 저장 경로·Mac Bundle Identifier·키체인 식별자를 유지합니다. Windows CI에서는 1.0.0→1.1.0 설치 후 설정 파일 보존을 확인했습니다. Mac의 기존 계정·수신자·설정 재실행 검사는 통과했으며, 실제 사용자 키체인 승인은 업데이트 후 다시 필요할 수 있습니다.

## 첫 파일 보내기

1. ‘메일 설정’에서 보내는 이메일, 받을 이메일, 메일 서비스의 앱 비밀번호를 연결합니다.
2. 파일을 화면 상단 중앙에 1초 들고 있다가 놓습니다. Mac은 메뉴 막대 바로 아래 중앙입니다.
3. 받는 사람을 확인하고 보냅니다. 여러 파일·폴더는 ZIP으로 묶습니다.
4. 큰 파일은 ‘Google 계정 연결’로 자신의 Drive를 연결하고 공유 대상에 동의한 후 링크로 보냅니다.

네이버는 IMAP/SMTP를 켜고 2단계 인증의 앱 비밀번호를 사용합니다. Gmail도 앱 비밀번호를 사용하며 조직 정책에 따라 제한될 수 있습니다. 네이버/Google 일반 로그인 비밀번호를 앱에 입력하지 마세요. 원본은 보존하며 계정 비밀은 운영체제 보안 저장소에 보관합니다.

설정에서 주소 변경·연결 해제가 가능합니다. 실패 원인과 재시도는 ‘전송 기록’에서 확인하세요. ‘완료’는 메일 서버 접수이며 실제 수신은 메일함에서 확인합니다. 창을 닫으면 백그라운드에서 유지되며 ‘프로그램 종료’로 완전히 닫습니다.

## 확인된 범위와 제한

- Windows: 실제 CI의 UI·로컬 TLS SMTP·ZIP, 설치/삭제/재설치/업데이트 검사 통과.
- Mac: ARM64/Intel 네이티브 빌드·앱 창·Keychain·ZIP 및 화면/전송 자동 검사 통과.
- 사용자가 이전 버전에서 Windows와 친구 M2의 실제 전송 성공을 확인했습니다. 새 버전의 친구 Mac 실기기 재확인은 아직 필요합니다. Windows에서는 사용자 승인을 받아 새 일반 계정 한 개의 Google 로그인·64KiB 비공개 업로드/다운로드와 기존 계정의 1MiB 첨부 및 52.85MB 링크 메일 수신을 확인했습니다. 이를 모든 계정이나 무제한 사용자 검증으로 표현하지 않습니다.
- Google OAuth는 2026-11-09 배포자가 프로덕션 전환을 확인했습니다. 사용자가 Google Cloud 설정이나 OAuth JSON을 준비할 필요는 없습니다.
- **Windows 코드 서명, Apple Developer ID 서명·공증은 없습니다.** Mac ad-hoc 서명 검사는 Apple 인증이 아닙니다. Gatekeeper는 거부되었고 Notary Ticket Missing / Internal Xprotect Error는 해결되지 않았습니다.

Mac에서 출처와 SHA-256을 확인한 뒤 OS가 제공하는 해당 앱의 안내를 읽으세요. ‘손상됨’·악성 소프트웨어 경고 또는 ‘그래도 열기’가 없으면 실행을 중단하고 문의하세요. Gatekeeper 해제·xattr 제거·키체인 초기화를 안내하지 않습니다. [Apple의 안전한 앱 실행 안내](https://support.apple.com/ko-kr/102445)

- [한국어 사용 설명서](docs/START-HERE-ko.txt)
- [상세 검증 결과](docs/verification.json) · [SHA-256](docs/SHA256SUMS.txt) · [1.1.0 변경 사항](docs/CHANGELOG-ko.txt)
- [업데이트 내역](https://github.com/junyong290/PawPost-Downloads/releases) · [문의·오류 제보](https://github.com/junyong290/PawPost-Downloads/issues)

비밀번호·인증 코드·개인 파일을 공개 제보에 올리지 마세요. 자동 업데이트는 제공하지 않습니다. 최신 버전은 위 다운로드 페이지에서 확인할 수 있습니다.

## 1.1.0에서 달라진 점

- Google 권한 만료 시 재연결 안내, 완료한 임시 복사본 복구 정리, 안전한 ZIP 경로 검사.
- 최초 감지 너비와 애니메이션 ON/OFF. 기존 발 디자인·추적·낚아채기 유지.
- 도움말, 접근성 입력 이름, 숨겨진 창의 불필요한 갱신 개선.
- 기존 웹 PR #1의 메타데이터 전용 체험을 통합한 다운로드 페이지.

## 웹 개발·검증

이 사이트는 정적 HTML/CSS/JavaScript입니다. 앱의 비공개 소스나 개인 계정정보는 넣지 않습니다. `docs/`가 GitHub Pages 배포 경로입니다. 파일 체험은 이름과 개수만 읽으며 파일 내용·업로드 API는 사용하지 않습니다.

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
python3 -m http.server 4173 --bind 127.0.0.1 --directory docs
# 별도 터미널
pnpm test
```

`.github/workflows/web-quality.yml`에서 모바일/PC·키보드·터치·파일 미수집·접근성·Lighthouse를 검사합니다. 공개 다운로드 링크와 SHA-256은 릴리스 파일을 받은 뒤 별도로 확인합니다.
