import { Popup } from 'react-leaflet';
import styled from 'styled-components';
import {
  LocalPhoneRounded,
  MapRounded,
  AccessTimeFilledRounded,
  InfoOutlined,
  PaidOutlined,
} from '@mui/icons-material';
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
        width: 100%;
        ul > li {
          text-align: left;
          list-style: none;
          svg {
            vertical-align: text-bottom;
            width: 1rem;
            height: 1rem;
          }
        }
      }
    }
    .card-bottom {
      p {
        margin: 1.1em 0 0;
        font-size: 1rem;
        svg {
          vertical-align: text-bottom;
          width: 1.25rem;
          height: 1.25rem;
        }
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
            {address && (
              <li>
                <MapRounded />
                &ensp;{address}
              </li>
            )}
            {tel && (
              <li>
                <LocalPhoneRounded />
                &ensp;{tel}
              </li>
            )}
            {serviceTime && (
              <li>
                <AccessTimeFilledRounded />
                &ensp;{serviceTime}
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className='card-bottom'>
        {summary && (
          <p className='summary'>
            <InfoOutlined />
            &ensp;{summary}
          </p>
        )}
        {payex && (
          <p className='payex'>
            <PaidOutlined />
            &ensp;{payex}
          </p>
        )}
      </div>
    </StyledPop>
  );
}
