//generate standard shape data

export default class Shape {
    static STROKE = 'stroke'
    static FILL = 'fill'
    static POLYGON = 'polygon'
    static LINE = 'line'
    static ARC = 'arc'

    constructor(){
        this.config = {
            points:[],
            color:'',
            lineWidth:0,
            alpha:1,
            shadow:{x:0,y:0,blur:0,color:''},
            lineCap:'round',
            lineJoin:'round',
            lineDash:[0,0],
            type:Shape.STROKE
        }
    }

    line(config){
        /**@param config
         * config
         *      points      :   Array
         *      color       :   String
         *      lineWidth   :   Number
         *      alpha       :   Number
         *      shadow      :   Object
         *          {
         *              x       :   Number
         *              y       :   Number
         *              blur    :   Number
         *              color   :   any
         *          }
         *      lineCap     :   String
         *      lineJoin    :   String
         *      lineDash    :   Array,
         *      drawStyle   :
         *
         */
        const conf = this.config
        return {...conf,...config,s:'line'}
    }
    polygon(config,type=Shape.FILL){
        /**@param config
         * config
         *      points      :   Array
         *      color       :   String
         *      lineWidth   :   Number
         *      alpha       :   Number
         *      shadow      :   Object
         *          {
         *              x       :   Number
         *              y       :   Number
         *              blur    :   Number
         *              color   :   any
         *          }
         *      lineCap     :   String
         *      lineJoin    :   String
         *      lineDash    :   Array,
         *
         *
         */
        const conf = this.config
        return {...conf,...config,s:'p'}
    }
    arc(config){
        /**@param config
         * config
         *      color       :   String
         *      lineWidth   :   Number
         *      alpha       :   Number
         *      shadow      :   Object
         *          {
         *              x       :   Number
         *              y       :   Number
         *              blur    :   Number
         *              color   :   any
         *          }
         *      lineCap     :   String
         *      lineJoin    :   String
         *      lineDash    :   Array,
         *
         *      segments    :   Number
         *      origin      :   Array
         *      radius      :   Number
         *      startAngle  :   Number
         *      endAngle    :   Number
         *
         */
        if(config == null){
            return
        }
        const points = []
        const start = config.origin
        points.push(start)

        const startAngle = config.startAngle * Math.PI / 180
        const endAngle = config.endAngle * Math.PI / 180
        const angleOffset = endAngle - startAngle

        const segments = config.segments

        var o = [config.origin[0],config.origin[1]]
        var r = config.radius
        for(var i=0;i<=segments;i++){
            var cos = Math.cos(startAngle + angleOffset / segments * i)
            var sin = Math.sin(startAngle + angleOffset / segments * i)

            var x = r * cos
            var y = r * sin

            points.push([
                o[0] + x,
                o[1] + y
            ])
        }
        points.push(start)

        let conf = this.config


        return {...conf,...config,points}
    }
}