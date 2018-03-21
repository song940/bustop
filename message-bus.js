(function(exports){

  function MessageBus(target, options) {
    if(!(this instanceof MessageBus)){
      return new MessageBus(target, options);
    }
    target = target || window;
    this.target = (window.parent === window ? 
        target.contentWindow :
        target.parent) || target;
    window.addEventListener('message', this.handle.bind(this));
    return this;
  };

  MessageBus.prototype.send = function(message, to){
    to = to || '*';
    // console.debug('MessageBus#send', message);
    this.target.postMessage(message, to);
    return this;
  };

  MessageBus.prototype.on = function(type, fn){
    this.handlers = this.handlers || {};
    (this.handlers[type] = this.handlers[type] || []).push(fn);
    return this;
  };

  MessageBus.prototype.fire = function(type, args){
    args = [].slice.call(arguments, 1);
    this.handlers = this.handlers || {};
  (this.handlers[type] || []).forEach(fn => fn.apply(this, args));
    return this;
  };

  MessageBus.prototype.handle = function(e){
    this.fire('message', e.data, e);
    // console.log('MessageBus#handle', e);
    return this;
  };

  exports.MessageBus = MessageBus;

})(this);