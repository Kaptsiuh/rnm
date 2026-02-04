type Props = {
  title: string;
  value: string;
};

export const CharacterProperty = ({ title, value }: Props) => {
  return (
    <div className="flex">
      <h3 className="text-lg mr-2">
        {title}
        <span>:</span>
      </h3>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
};
