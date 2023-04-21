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
    .card-mid {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0 0 0;
      .info {
        width: 75%;
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
    }
    .card-bottom {
      p {
        margin: 1.3em 0 0;
      }
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
  fare,
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
      <div className='card-mid'>
        <div className='info'>
          <ul>
            <li>地址：{address}</li>
            <li>電話：{tel}</li>
            <li>營業時間：{serviceTime}</li>
          </ul>
        </div>
        <div className='circle'>
          <span className='fare'>{fare}</span>
          <span>/時</span>
        </div>
      </div>
      <div className='card-bottom'>
        <p className='summary'>{summary}</p>
        <p className='payex'>{payex}</p>
      </div>
    </StyledPop>
  );
}
