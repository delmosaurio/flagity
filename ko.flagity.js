/**
 * Flagity v1.0.0-beta
 *
 * Custom binding for knockoutjs to switch boolean attibutes of the DOM with flags
 *
 * Copyright(c) 2013 Delmo Carrozzo <dcardev@gmail.com>
 * MIT Licensed
 *
 * project https://github.com/delmosaurio/flagity
 * issues https://github.com/delmosaurio/flagity/issues
 *
 */

(function($, ko, undefined){

    ko.flagity = ko.flagity || {};

    ko.flagity.Flagity = (function(ko){
        var Flagity = function(options, valueAccessor) {
            var self = this;

            options = options || {};
            self.type = options.type || 'binary';

            self.flag = valueAccessor;

            if (options.comparer !== undefined) {

                if ('function' !== typeof options.comparer) {
                    return new Error("the comparer is not a function");
                }

                self.comparer = options.comparer;    
            } else if (self.type == 'keys') {
                self.comparer = keysComparer;
            }
            
            return self;
        };

        // set binary comparer default 
        Flagity.prototype.comparer = binaryComparer;

        Flagity.prototype.match = function(flags, fComparer) {
            if (fComparer !== undefined && "function" == typeof fComparer) {
                return fComparer.apply(this, [flags, ko.unwrap(this.flag), this.type])
            }

            return this.comparer.apply(this, [flags, ko.unwrap(this.flag), this.type])
        };

        return Flagity;

        //#region private
        function keysWraper(keys) {
            var res = [];

            if (keys !== undefined) {
                res = keys.split(',');
            }

            return res;
        }

        function binaryComparer(flags, value) {
            return (flags & value) == flags;
        }

        function keysComparer(key, flags) {
            var keys = keysWraper(flags), f;

            while(keys.length) {
                f = keys.shift();
                if (f == key) { return true; }
            }

            return false;
        }
        //#endregion

    })(ko);

    ko.bindingHandlers['flagityWith'] = {
        'init': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            
            var newProperties = { 
                    _flagity: new ko.flagity.Flagity(allBindingsAccessor().flagityOptions, valueAccessor())
                };

            var childBindingContext = bindingContext.createChildContext(viewModel);

            ko.utils.extend(childBindingContext, newProperties);

            ko.applyBindingsToDescendants(childBindingContext, element);
     
            return { controlsDescendantBindings: true };
        }
    };

    ko.bindingHandlers['flagity'] = {
        'update': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var flagityOptions = ko.unwrap(valueAccessor())
              , _f = bindingContext._flagity
              , fComparer = undefined;

            if (_f === undefined && flagityOptions['flag'] === undefined) {
                return new Error('flagity', 'something wrong, no flag and no flagityWith defined');
            } else if (_f === undefined) {
               _f = new ko.flagity.Flagity(flagityOptions, flagityOptions['flag']);
            }

            if (flagityOptions.hasOwnProperty('comparer')) {
                fComparer = flagityOptions['comparer'];
            }

            if ("object" == typeof flagityOptions) {

                ko.utils.objectForEach(flagityOptions, function(propName, value) {
                    if (!ko.bindingHandlers.hasOwnProperty(propName)) return;

                    if ("object" == typeof value) {
                        ko.utils.objectForEach(value, function(attrName, objValue) {
                            var to = [];
                            to[attrName] = _f.match(ko.unwrap( objValue ), fComparer);
                            ko.bindingHandlers[propName]['update'](
                                element, 
                                function () {
                                    return to;
                                }
                            );
                        });
                    } else {
                        ko.bindingHandlers[propName]['update'](
                            element, 
                            function(){ 
                                return _f.match(ko.unwrap( value ), fComparer); 
                            }
                        );
                    }

                });
            }

        }
    };

})(jQuery, ko)