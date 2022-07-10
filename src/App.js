import Slider from './components/Slider';
import people from './data/people';

export default function App() {
  return (
    <div className="grid bg-slate-400">
      <Slider data={people}/>
    </div>
  );
};
