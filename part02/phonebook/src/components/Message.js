const Message = ({ message, color }) => {
    if (!message) return null;

    const style = {color: color}

    return (
        <div className="message" style={style}>
            {message}
        </div>
    )
}

export default Message