# PawPost · 친구용 무료 베타

**[다운로드 페이지 열기](https://junyong290.github.io/PawPost-Downloads/)**

파일은 놓기만 하세요. 나머지는 고양이가.

이 저장소는 공개 다운로드 페이지와 배포 파일을 위한 저장소입니다. 앱 개발 소스와 개발 이력, 개인 계정 정보는 포함하지 않습니다.

| 컴퓨터 | 버전 | 다운로드 | 실제 확인 범위 |
|---|---|---|---|
| Windows 10/11 x64 | 6.3.0 베타 | [설치 EXE](https://github.com/junyong290/PawPost-Downloads/releases/download/friends-beta-2026.11.09.2/PawPost-6.3.0-Windows-x64-TEST-Setup.exe) | 기존 실제 이메일·Drive 수신 확인 / 같은 설치 파일 유지 |
| Mac M시리즈 (M2 포함) | 6.3.2-beta.1 | [ARM64 DMG](https://github.com/junyong290/PawPost-Downloads/releases/download/friends-beta-2026.11.09.2/PawPost-6.3.2-beta.1-osx-arm64-ADHOC.dmg) | native macOS 15.8.2 앱 실행 검사 통과 / 첫 다운로드 실행 미검증 |
| Mac Intel | 6.3.2-beta.1 | [x64 DMG](https://github.com/junyong290/PawPost-Downloads/releases/download/friends-beta-2026.11.09.2/PawPost-6.3.2-beta.1-osx-x64-ADHOC.dmg) | native macOS 15.7.9 앱 실행 검사 통과 / 첫 다운로드 실행 미검증 |

**Mac은 macOS 15 이상이 필요하며, Apple Developer ID 서명·공증이 없는 베타입니다. Gatekeeper 검사는 거부되었습니다.** 앱 번들 ad-hoc 서명 검증 통과는 Apple 신뢰 서명이나 공증을 뜻하지 않습니다. 배포 정책 검사에 `Notary Ticket Missing`과 미해결 `Internal Xprotect Error`가 남아 있습니다. 모든 Mac에서 설치·실행을 보장하지 않습니다.

‘손상됨’, 악성 소프트웨어 경고, 또는 ‘그래도 열기’가 없으면 실행하지 말고 배포자에게 알려 주세요. Gatekeeper 해제, xattr 제거 등의 우회는 제공하지 않습니다.

- [한국어 사용 설명서](docs/START-HERE-ko.txt)
- [검증 상세](docs/verification.json) / [SHA-256](docs/SHA256SUMS.txt)
- [업데이트 내역](https://github.com/junyong290/PawPost-Downloads/releases)
- [오류 제보](https://github.com/junyong290/PawPost-Downloads/issues) — 비밀번호·개인 파일·OAuth 인증 코드/토큰을 올리지 마세요.

Google 공개 전환은 재확인 중이며 마지막 확인 상태는 Testing입니다. Testing일 때는 승인된 계정만 Drive에 연결할 수 있습니다. 일반 사용자는 OAuth JSON이나 Cloud 콘솔을 준비할 필요가 없습니다. 메일 발신 계정은 별도로 연결합니다.

## 배포 유지 방법

GitHub Pages는 `main`의 `docs/`를 게시합니다. 새 베타를 검증한 뒤 GitHub **prerelease**에 설치 파일을 업로드하고 `docs/release.json`, 체크섬, 본문 링크와 검증 상태를 함께 갱신합니다. `/releases/latest/download`는 베타를 선택하지 않으므로 사용하지 않습니다. 친구에게는 위의 고정 웹사이트 주소를 전달하세요. 앱의 자동 업데이트 기능은 없습니다.

Cloudflare Pages로 이전할 경우 이 저장소의 `docs/`를 정적 사이트 출력으로 지정할 수 있습니다(프레임워크 없음, 빌드 명령 없음). 현재 실제 호스팅은 GitHub Pages이며 Cloudflare 계정 권한은 연결하지 않았습니다.
