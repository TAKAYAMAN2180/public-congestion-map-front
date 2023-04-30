import styled from "styled-components";

//TODO:デスクトップ版に表示される右側のスクロールバーを消す

const HideScrollBarDiv=styled.div`
  & * {
    /*スクロールバー非表示（IE・Edge）*/
    -ms-overflow-style: none;
    /*スクロールバー非表示（Firefox）*/
    scrollbar-width: none;
  }
  & *::-webkit-scrollbar {
    display:none;
  }
`;

export default HideScrollBarDiv;