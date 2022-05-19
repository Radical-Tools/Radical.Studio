namespace Radical.Studio.Server.SignalR.Application.Messages;

public abstract class MessageBase
{
    public bool Success { get; }
    public string Exception { get; }

    protected MessageBase(bool success = true, string exception = "")
    {
        Success = success;
        Exception = exception;
    }
}
