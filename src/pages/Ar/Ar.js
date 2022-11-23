import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";
import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import useScript from "../../modules/useScript.ts";
import { ReactComponent as Back } from "../../assets/images/uil_arrow-left.svg";
import { ReactComponent as Camera } from "../../assets/images/uil_camera-plus.svg";
import Modal from "./components/Modal";
import { arContents, arCreatePost, arId, userCoords } from "../../recoil/ar";
import instance from "../../modules/api";
import axios from "axios";
import { commentsState, postState } from "../../recoil/post";
import useInterval from "../../modules/useInterval";
import armock from "../../assets/images/armock1.png";
import { getDistance } from "../../modules/getDistance";

const ARContainer = styled.div`
  height: 100%;
  position: relative;
  a-scene {
    height: 100%;
    width: 100%;
  }
`;

const PC = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.palette.inversed2};
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    font-family: "ExtraBold";
    font-size: 1.6rem;
    color: ${(props) => props.theme.palette.default1};
  }
`;

const BackButton = styled(Link)`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 2.4rem;
  background-color: rgba(255, 255, 255, 0.75);
  position: absolute;
  top: 6rem;
  left: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const Add = styled.div`
  background-color: rgba(255, 255, 255, 0.75);
  position: fixed;
  bottom: 5.8rem;
  width: 15.4rem;
  border-radius: 3.2rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 1.5rem;
  & span {
    font-family: "SemiBold";
    font-size: 1.6rem;
    line-height: 1.6rem;
    color: ${(props) => props.theme.palette.primary3};
    margin-left: 0.92rem;
  }
`;

const isMobile = /Mobi/i.test(window.navigator.userAgent); // 모바일 체크

function Ar() {
  const [arCreate, setARCreate] = useRecoilState(arCreatePost); //ar 포스트 작성에 필요한 정보
  const [contents, setContents] = useRecoilState(arContents); //ar 포스트
  const coords = useRecoilValue(userCoords);
  const [prevCoords, setPrevCoords] = useState({ x: 0, y: 0 });
  const [ar_id, setArId] = useRecoilState(arId); //ar 포스트 id
  const navigate = useNavigate();
  const nftStatus = useScript(
    "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js",
  );
  const lookatStatus = useScript(
    "https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js",
  );

  useEffect(() => {
    if (!isMobile) alert("AR 여행 기능은 모바일에서만 이용 가능합니다.");
    //get user coordinate
    //getPosition();

    return () => {
      let html = document.querySelector("html");
      let body = document.querySelector("body");
      let video = document.querySelector("video");
      if (video) body.removeChild(video);
      html.classList.remove("a-fullscreen");
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      //get ar post
      if (coords) {
        //alert(`fetch 17 ${coords.x} ${coords.y}`);
        let dist = getDistance(prevCoords.x, prevCoords.y, coords.x, coords.y);
        //alert("dist " + dist);
        if (dist > 1000) {
          instance
            .get("post/get_around_posts", {
              params: {
                x: coords.x,
                y: coords.y,
              },
            })
            .then((res) => {
              setContents(res.data);
            });
        }
      }
    }
    return () => {
      //coords 업데이트 직전 이전 값 저장
      if (coords) {
        setPrevCoords({
          x: coords.x,
          y: coords.y,
        });
      }
    };
  }, [coords]);

  const [post, setPost] = useRecoilState(postState);
  const [comments, setComments] = useRecoilState(commentsState);

  useEffect(() => {
    if (ar_id) {
      //글 정보 받아오기
      instance
        .get(`/post/read/post_id=${ar_id}`)
        .then((res) => {
          setPost(res.data);
        })
        .catch((err) => {
          throw err;
        });

      //댓글 정보 받아오기
      instance
        .get(`/post/read/comments/post_id=${ar_id}`)
        .then((res) => {
          setComments(res.data);
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [ar_id, setComments, setPost]);

  return (
    <ARContainer>
      {!isMobile ? (
        <PC>
          <span>AR여행은 모바일에서 이용가능합니다. •́︿•̀ ｡</span>
        </PC>
      ) : (
        lookatStatus === "ready" &&
        nftStatus === "ready" && (
          <a-scene
            debug
            cursor="rayOrigin: mouse;"
            raycaster="objects: .raycastable"
            vr-mode-ui="enabled: false"
            //embedded
            arjs="sourceType: webcam; sourceWidth:1080; sourceHeight:764; displayWidth: 1080; displayHeight: 764; debugUIEnabled: false; videoTexture:true;"
            //arjs="sourceType: webcam; debugUIEnabled: false; videoTexture:true;"
            //renderer="antialias: true; alpha: true"
          >
            <a-assets>
              {contents.map((entity) => (
                <img
                  id={entity.ar_post_id}
                  src={entity.image}
                  alt="ar contents"
                  key={entity.ar_post_id}
                />
              ))}
            </a-assets>
            <a-camera
              gps-camera=""
              rotation-reader=""
              camera-handler
            ></a-camera>
            {contents.map((entity) => (
              <a-image
                gps-entity-place={`latitude: ${entity.x_value}; longitude: ${entity.y_value};`}
                class="raycastable"
                clickhandler={entity.ar_post_id}
                key={entity.ar_post_id}
                src={`#${entity.ar_post_id}`}
                look-at="[gps-camera]"
                position={`0 ${entity.z_value} 0`}
                scale="20 20 20"
              ></a-image>
            ))}
          </a-scene>
        )
      )}
      <BackButton to="../Home">
        <Back width="3.2rem" height="3.2rem" />
      </BackButton>
      <Add onClick={() => navigate("../Create")}>
        <Camera width="2.8rem" height="2.8rem" />
        <span>포스트 남기기</span>
      </Add>
      {post && <Modal />}
    </ARContainer>
  );
}

export default Ar;
