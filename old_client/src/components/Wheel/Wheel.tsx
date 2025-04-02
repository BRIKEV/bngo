import './Wheel.scss';

interface Props {
  selected: {
    image: string;
    name: string;
  },
  animate: boolean;
  images: {
    id: number;
    image: string;
    selected: boolean;
  }[];
}

const RouletteComponent = ({ selected, animate, images }: Props) => (
  <div className="roulette">
    <div className="wheel">
      <div className="selectedImage" style={{ display: !animate ? 'block' : 'none' }}>
        <img className="image" src={selected.image} alt={selected.name} />
      </div>
      <div className={`wheel-inner ${animate && 'animate'}`} style={{ display: animate ? 'block' : 'none' }}>
        {images.map(data => (
          <div key={data.id} className="imageCard">
            <img className="image" src={data.image} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default RouletteComponent;
