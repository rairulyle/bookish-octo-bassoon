interface Props {
  message: React.ReactNode;
}
function StatusMessage({ message }: Props) {
  return (
    <div className="text-center" data-testid="todo-status">
      <span className="text-sm opacity-80">{message}</span>
    </div>
  );
}

export default StatusMessage;
