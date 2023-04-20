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
    }
    .parkingLotTitle {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0.5rem 0 1rem 0;
    }
    span.available {
      font-size: 3rem;
    }
    .card-mid {
      display: flex;
      width: 100%;
      flex: 1;
      justify-content: space-between;
      padding: 1rem 0 0 0;
      ul > li {
        text-align: left;
        list-style: none;
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
  }
`;

export const CustomPopup = ({
  available,
  totalCar,
  title,
  address,
  tel,
  serviceTime,
  fare,
  summary,
}) => {
  return (
    <StyledPop>
      <div className='card-top'>
        <div className='spacesLeft'>
          <span className='available'>{available}</span>
          <span className='totalCar'>/{totalCar}</span>
        </div>
        <p className='parkingLotTitle'>{title}</p>
      </div>
      <div className='card-mid'>
        <div>
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
      </div>
    </StyledPop>
  );
};
