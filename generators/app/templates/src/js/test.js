import $ from 'zepto';

let log = (msg) => {
    console.log(msg)
};

let printToDom = (msg) => {
    let $dom = $('#test');
    $dom.html(msg);
    log(msg);
};
export {
    log,
    printToDom
};