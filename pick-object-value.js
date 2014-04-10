try{ var base = window; }catch( error ){ var base = exports; }
( function module( base ){
	define( "pickObjectValue",
		[
			"argumentsToArray",
			"pickObjectProperty"
		],
		function construct( ){
			var pickObjectValue = function pickObjectValue( object, propertyList ){
				var parameters = argumentsToArray( arguments );

				/*
					If we have property list, otherwise get all.

					This will actually do a shallow clone but this is
						not intended for that.

					This measure is done so that we are prepared if the developer
						forgot to add the property list.
				*/
				if( parameters.length > 1 ){
					propertyList = parameters.slice( 1 );	
				}else{
					propertyList = Object.keys( object );
				}

				var propertyListLength = propertyList.length;

				var property;
				for( var index = 0; index < propertyListLength; index++ ){
					property = propertyList[ index ];
					if( typeof property != "string" ){
						throw new Error( "invalid property" );
					}
				}

				var propertySet = pickObjectProperty.apply( this, parameters );

				var valueList = [ ];
				var property;
				for( var index = 0; index < propertyListLength; index++ ){
					property = propertyList[ index ];
					if( property in object ){
						valueList.push( propertySet[ property ] );	
					}
				}

				return valueList;
			};

			base.pickObjectProperty = pickObjectProperty;
		} );
} )( base );