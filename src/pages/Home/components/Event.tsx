import { useRecoilValue } from "recoil";
import { Pagination, Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import styled from "styled-components";
import { ReactComponent as Icon } from "../../../assets/images/uil_location-point.svg";
import { homeEvent } from "../../../recoil/home";

const StyledContainer = styled.div`
  padding: 0 3rem;
  .swiper-pagination {
    bottom: 0;
  }
  .swiper-pagination-bullet-active {
    background-color: ${(props) => props.theme.palette.primary3};
  }
  .swiper {
    height: 7rem;
  }
`;

const StyledEvent = styled.div`
  background-color: ${(props) => props.theme.palette.inversed1};
  height: 4.7rem;
  border-radius: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  & + & {
    margin-right: 0.1rem;
  }
  & span {
    font-family: "SemiBold";
    font-size: 1.4rem;
    color: ${(props) => props.theme.palette.red};
    line-height: 1.7rem;
    margin-left: 0.4rem;
  }

  & span + span {
    color: ${(props) => props.theme.palette.default2};
    margin-left: 0.6rem;
  }
`;

function Event() {
  const event = useRecoilValue(homeEvent);

  return (
    <StyledContainer>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ type: "bullets" }}
      >
        {event.map((e) => (
          <SwiperSlide key={e.id}>
            <StyledEvent>
              <Icon height="1.7rem" width="1.7rem" />
              <span>{e.location}</span>
              <span>{`${e.type} 이벤트 시작!`}</span>
            </StyledEvent>
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledContainer>
  );
}
export default Event;
