function doPost(e) {
  try {
    // 사용자가 제공한 스프레드시트의 ID
    var sheetId = '1zi8-HKtgoaiQCvc5462-EqRc9Mq-172GVm4yzL4Z-K8';
    var sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();

    // 클라이언트에서 보낸 데이터 파싱
    var data = JSON.parse(e.parameter.data);

    // 헤더 추가 (시트가 비어있는 경우 첫 줄에 헤더 작성)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        '시간', '이름', '시도 횟수(Trial)', '시퀀스 길이', 
        '목표 시퀀스', '사용자 응답', '정확히 일치', 
        '위치 일치 개수', '반응 시간(ms)'
      ]);
    }

    // 각 트라이얼 데이터 행으로 추가
    var timestamp = new Date();
    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      sheet.appendRow([
        timestamp,
        row.participant_name,
        row.trial_index,
        row.sequence_length,
        row.target_sequence,
        row.response,
        row.exact_correct ? 'O' : 'X',
        row.position_correct,
        row.response_time_ms
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
