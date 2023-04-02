import type {Scene} from '@motion-canvas/core/lib/scenes';
import {Label} from './Label';
import {useSubscribableValue} from '../../hooks';
import {useTimelineContext} from '../../contexts';
// import type { TimeEvent } from '@motion-canvas/core/src/scenes/timeEvents';

interface LabelGroupProps {
  scene: Scene;
  lane: number;
}

// export function LabelGroup({scene, lane}: LabelGroupProps) {
export function LabelGroup(props: LabelGroupProps) {
  const {firstVisibleFrame, lastVisibleFrame} = useTimelineContext();
  const events = useSubscribableValue(props.scene.timeEvents.onChanged);
  const cached = useSubscribableValue(props.scene.onCacheChanged);
  const isVisible =
    cached.lastFrame >= firstVisibleFrame &&
    cached.firstFrame <= lastVisibleFrame;

  return (
    <>
      {isVisible &&
        events.filter((x) => { return x.lane == props.lane }).map((event: any) => (
        // events.map(event => (
          <Label key={event.name} event={event} scene={props.scene} />
        ))}
        
    </>
    
    // <></>
  );
}
