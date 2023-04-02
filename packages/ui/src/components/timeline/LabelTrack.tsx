import styles from './Timeline.module.scss';

import {useScenes} from '../../hooks';
import {LabelGroup} from './LabelGroup';
import { Console } from '../console';
import { Debug } from '../viewport/Debug';

interface LabelTrackProps {
  lane: number;
}
//export function LabelTrack() {
 export function LabelTrack({lane}: LabelTrackProps) {
  const scenes = useScenes();
  //filter((x) => {x.})
  return (
    <div className={styles.labelTrack}>
      {scenes.map(scene => (
        //<LabelGroup key={scene.name} scene={scene} />
        <LabelGroup key={scene.name} scene={scene} lane={lane} />
      ))}
    </div>
  );
}
