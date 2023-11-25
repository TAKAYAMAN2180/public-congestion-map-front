function formatUnixTimeToHHMM(unixTime: number): string {
  const date = new Date(unixTime * 1000); // Unixタイムスタンプをミリ秒に変換
  const hours = date.getHours().toString().padStart(2, "0"); // 時間を2桁に
  const minutes = date.getMinutes().toString().padStart(2, "0"); // 分を2桁に

  return `${hours}:${minutes}`;
}

export default formatUnixTimeToHHMM;
