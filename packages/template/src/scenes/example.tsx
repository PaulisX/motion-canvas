import {Scene2D, makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {Circle, Txt, Line, Rect, Spline} from '@motion-canvas/2d/lib/components';
import {createSignal} from '@motion-canvas/core/lib/signals';
import {Vector2} from '@motion-canvas/core/lib/types';
import {LoopCallback, all, loop, run, waitFor, waitUntil} from '@motion-canvas/core/lib/flow';
import { createRef, useDuration, useTime } from '@motion-canvas/core/lib/utils';
import { ThreadGenerator, cancel } from '@motion-canvas/core/lib/threading';
import {decorate,threadable} from '@motion-canvas/core/lib/decorators'
import { easeInOutBounce, easeInOutCubic, easeOutBounce, map, tween } from '@motion-canvas/core/lib/tweening';

export default makeScene2D(function* (view) {
  
  const spline = createRef<Spline>();

  view.add(
    <Spline
      ref={spline}
      lineWidth={6}
      stroke={'lightseagreen'}
      smoothness={1.7/3}
      points={[
        [-300, 0],
        [0, 300],
        [300, 0],
        [0, -300],
      ]}
      closed
      end={0}
    />,
  );
  yield loopUntil("color", function* (i) { yield* spline().stroke('lightseagreen',1).to('red', 1) },1);

  yield* spline().end(1, 1.5);
  yield* tween(2, value => {
    spline().smoothness(map(1.7/3, 0, easeOutBounce(value)));
  });
  
  
  /*const myCircle = createRef<Circle>();
  

  view.add(
    <Circle
      ref={myCircle}
      // try changing these properties:
      width={600}
      height={600}
      fill="#e13238"
    />,
  );*/
  yield * spline().position.y(150, 1).to(-150, 1);
/*
  yield* all(
    myCircle().position.x(300, 1).to(-300, 1),
    myCircle().fill('#e6a700', 1).to('#e13238', 1),
  );*/
  

  // join(task);
  //yield* waitUntil('sus')
  //cancel(task);
    
  /*var endTime = useTime()+useDuration('event');
  while(useTime() <endTime){
    yield * myCircle().position.x(300, .5).to(-300, .5);
  }*/
  yield * spline().position.x(300, 1);
  yield* loopUntil("sus", function* (i) { yield* spline().position.x(300, i).to(-300, 1) });

  yield * spline().position.y(150, 1).to(-150, 1);
  const task = yield loop(Infinity, function*() {
    // animate something
    yield* spline().position.x(300, 1).to(-300, 1)
  });
  // join(task);
  yield* waitUntil('cus')
  cancel(task);


  yield * spline().absoluteScale(new Vector2(0, 0),2);
/*
  const myRect = createRef<Rect>();
  view.add(
    <Rect
    ref={myRect}
    // try changing these properties:
    width={100}
    height={100}
    x={myCircle().position.x}
    y={myCircle().position.y}
    radius={90}
    fill="#e13238"
    />,
    );
    myCircle().remove();
    yield * myRect().radius(0,1);
    //yield * myCircle().position.y(150, 1).to(-150, 1);\
    */
});

decorate(loopUntil, threadable()); 
function* loopUntil(event: string, factory: LoopCallback, lane:number=0): ThreadGenerator {
  let i = 0;
  let time = useTime() + useDuration(event,lane);
  while (useTime() < (time == 0 ? 1:time)) {
    const generator = factory(i);
    i++;
    if (generator) {
      yield* generator;
    } else {
      yield;
    }
  }
}