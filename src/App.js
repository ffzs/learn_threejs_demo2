import lerp from "lerp"
import React, {useRef, useEffect, Suspense} from "react"
import {Canvas, useFrame, Dom} from "react-three-fiber"
import {Block, useBlock} from "./blocks"
import state from "./store"
import "./App.css"
import Diamonds from "./diamonds/Diamonds"
import Graph1 from "./graph1";
import Graph2 from "./graph2";
import Graph3 from "./graph3";
import "./CustomMaterial"


const getGraph = (graphNum) => {
  if (graphNum === 3) return (<Graph3/>);
  else if (graphNum === 2) return (<Graph2/>);
  else return (<Graph1/>);
};

const getInfo = (graphNum) => {
  if (graphNum === 3) return {title:'Scatter Plot 散点图', lines:['数据分布', '数据趋势', '气泡图', '火山图']};
  else if (graphNum === 2) return {title:'Wind Rose 风玫瑰图', lines:['形象表示风向', '表示风力', '数据的形状，比对明显']};
  else return {title:'Box Plot 箱线图', lines:['数据异常值', '偏态和尾重', '数据的形状']};
};

function Plane({color = "white", ...props}) {
  const {viewportHeight, offsetFactor} = useBlock();
  const material = useRef();
  let last = state.top.current;
  useFrame(() => {
    const {pages, top} = state;
    material.current.scale = lerp(material.current.scale, offsetFactor - top.current / ((pages - 1) * viewportHeight), 0.1);
    material.current.shift = lerp(material.current.shift, (top.current - last) / 150, 0.1);
    last = top.current
  });
  return (
    <mesh {...props}>
      <planeBufferGeometry attach="geometry" args={[1, 1, 32, 32]}/>
      <customMaterial ref={material} attach="material" color={color}/>
    </mesh>
  )
}

const getList = ({title, lines}) => {
  const lis = lines.map(line=>(<li>{line}</li>));
  return (
    <>
      <h1> {title} </h1>
      <ul>
        {lis}
      </ul>
    </>
  )
};

function Content({left, children, graphNum}) {
  const {contentMaxWidth, canvasWidth, margin, mobile} = useBlock();
  const alignRight = (canvasWidth - contentMaxWidth - margin) / 2;
  const pixelWidth = contentMaxWidth * state.zoom;
  const alignDirection = left ? -1 : 1;
  return (
    <group position={[0, 0, 0]}>
      <Dom style={{width: pixelWidth / (mobile ? 1 : 2), textAlign: "left"}}
           position={[contentMaxWidth*alignDirection / 4- alignRight*2, contentMaxWidth / 3, 1]}>
          {getGraph(graphNum)}
      </Dom>
      <Dom style={{width: pixelWidth / (mobile ? 1 : 2), textAlign: "left"}}
           position={[-contentMaxWidth*alignDirection / 2 - alignRight*0.8 , contentMaxWidth / 10 * 3, 1]}
      >
        {getList(getInfo(graphNum))}
      </Dom>
      {children}
    </group>
  )
}

function Stripe() {
  const {contentMaxWidth} = useBlock();
  return (
    <Plane
      scale={[80, contentMaxWidth, 1]}
      rotation={[0, 0, Math.PI / 6]}
      position={[0, 0, -2]}
      color = '#e3f6f5'
    />
  )
}

function Startup() {
  const ref = useRef();
  useFrame(() => (ref.current.material.opacity = lerp(ref.current.material.opacity, 0, 0.025)));
  return (
    <mesh ref={ref} position={[0, 0, 200]} scale={[100, 100, 1]}>
      <planeBufferGeometry attach="geometry" />
      <meshBasicMaterial attach="material" color="#070712" transparent />
    </mesh>
  )
}

const Pages = () => {
  return (
    <>
      <Block factor={1.5} offset={0}>
        <Content left/>
      </Block>
      {/* Second section */}
      <Block factor={2.0} offset={1}>
        <Content graphNum={2}/>
      </Block>
      {/* Stripe */}
      <Block factor={-0.5} offset={1}>
        <Stripe/>
      </Block>
      {/* Last section */}
      <Block factor={1.5} offset={2}>
        <Content left  graphNum={3}/>
      </Block>
    </>
  )
};

function App() {
  const scrollArea = useRef();
  const onScroll = e => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({target: scrollArea.current}), []);
  return (
    <>
      <div style={{'background': '#207757'}}>
        <label><img src={'logo.png'} alt={'logo'}/>数据可视化展示</label>
      </div>
      <Canvas orthographic camera={{zoom: state.zoom, position: [0, 0, 500]}}>
        <Suspense fallback={<Dom center className="loading" children="Loading..." />}>
          <Pages />
          {/*<Diamonds />*/}
          <Startup />
        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{height: `${state.pages * 100}vh`}}/>
      </div>
    </>
  )
}

export default App;
