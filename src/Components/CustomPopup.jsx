import { Popup } from 'react-leaflet';
import styled from 'styled-components';
const StyledPop = styled(Popup)`
  .leaflet-popup-content {
    display: flex;
    flex-direction: column;
    .card-top {
      background-color: var(--color-dark);
      color: var(--color-theme);
      width: 100%;
      border-radius: 12px;
      text-align: center;
      span.available {
        font-size: 3rem;
      }
      .noAvailableData {
        font-size: 1.25rem;
        padding: 1rem 1rem 0 1rem;
      }
      .parkName {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0.5rem 0.5rem 1rem;
      }
    }
    .card-bottom {
      p {
        margin: 1.3em 0 0;
      }
    }
  }
`;

const StyledCardMid = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0 0 0;
  .info {
    width: ${({ width }) => width};
    ul > li {
      text-align: left;
      list-style: none;
    }
  }
  .circle {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background-color: var(--color-theme);
    text-align: center;
    .fare {
      vertical-align: middle;
      line-height: 3.5rem;
      font-size: 1.5rem;
    }
  }
`;

export default function CustomPopup({
  available,
  totalcar,
  name,
  address,
  tel,
  serviceTime,
  FareInfo,
  summary,
  payex,
}) {
  return (
    <StyledPop>
      <div className='card-top'>
        {available > 0 ? (
          <div className='availableData'>
            <span>剩餘</span>
            <span className='available'>{available}</span>
            <span className='totalCar'>/{totalcar}</span>
          </div>
        ) : (
          <div className='noAvailableData'>
            <span>總計車位{totalcar}</span>
          </div>
        )}
        <p className='parkName'>{name}</p>
      </div>
      {FareInfo.WorkingDay ? (
        <StyledCardMid width='75%'>
          <div className='info'>
            <ul>
              {address && <li>地址：{address}</li>}
              {tel && <li>電話：{tel}</li>}
              {serviceTime && <li>營業時間：{serviceTime}</li>}
            </ul>
          </div>
          <div className='circle'>
            <span className='fare'>{FareInfo.WorkingDay[0].Fare}</span>
            <span>/時</span>
          </div>
        </StyledCardMid>
      ) : (
        <StyledCardMid width='100%'>
          <div className='info'>
            <ul>
              {address && <li>地址：{address}</li>}
              {tel && <li>電話：{tel}</li>}
              {serviceTime && <li>營業時間：{serviceTime}</li>}
            </ul>
          </div>
        </StyledCardMid>
      )}
      <div className='card-bottom'>
        {summary && <p className='summary'>{summary}</p>}
        {payex && <p className='payex'>{payex}</p>}
      </div>
    </StyledPop>
  );
}
