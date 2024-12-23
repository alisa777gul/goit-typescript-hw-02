import style from './LoadMore.module.css';
import { LoadMoreProps } from './LoadMore.types';



export default function LoadMore({ onLoad }:LoadMoreProps):JSX.Element {
  return (
    <div className={style.btnDiv}>
      <button className={style.btn} type="button" onClick={onLoad}>
        Load More
      </button>
    </div>
  );
}
