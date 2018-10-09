const style = `
.clearpoll-loading-overlay {
  width:100%;
  height:100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@-webkit-keyframes clearpoll-ripple-load {
  0% {
    top: 90px;
    left: 90px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 35px;
    left: 35px;
    width: 110px;
    height: 110px;
    opacity: 0;
  }
}

.clearpoll-ripple-load {
  position: relative;
}

.clearpoll-ripple-load div {
  box-sizing: content-box;
  position: absolute;
  border-width: 10px;
  border-style: solid;
  opacity: 1;
  border-radius: 50%;
  -webkit-animation: clearpoll-ripple-load 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  animation: clearpoll-ripple-load 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.clearpoll-ripple-load div:nth-child(1) {
  border-color: #98fffc;
}

.clearpoll-ripple-load div:nth-child(2) {
  border-color: #1764a1;
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}

.clearpoll-ripple-load {
  width: 200px !important;
  height: 200px !important;
  -webkit-transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
  transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
}
`;

export default style;
