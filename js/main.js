


$(function () {
    var socket_conn = new SocketConn();
    socket_conn.init();
    var ui = new UI(socket_conn);
    ui.init();
    var engine = new FightEngine(socket_conn);
    engine.init();
    var input = new Input(engine.stage_manager, socket_conn);

    engine.animate();

});