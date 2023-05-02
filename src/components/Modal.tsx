import NewRoom from './NewRoom';
import CloseIcon from './ui/icons/CloseIncon';

type Props = {
  onClose: () => void;
};

export default function Modal({ onClose }: Props) {
  return (
    <section
      className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-50 bg-neutral-900/70"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        className="fixed top-0 right-0 p-8 text-white"
        onClick={() => onClose()}
      >
        <CloseIcon />
      </button>
      <div className="bg-white w-4/5 h-3/5 max-w-7xl">
        <NewRoom />
      </div>
    </section>
  );
}
