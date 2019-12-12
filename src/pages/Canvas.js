//import '../../src/Roulette.css';
import mongo from '../lib/mongo-service';
import React, {Component} from 'react';
import PropTypes from 'prop-types';    
import { Button } from 'react-bootstrap';
import Nav from '../Components/Nav';
import logojuegos from '../img/logojuegos.jpeg';

class Canvas extends Component {
    constructor(props) {
      super(props);
      this.state = {
        spinAngleStart: 0,
        startAngle: 0,
        spinTime: 0,
        random: 0,
        arc: Math.PI / (props.options.length / 2),
      }
      this.spinTimer = null;
      this.handleOnClick = this.handleOnClick.bind(this);
      this.spin = this.spin.bind(this);
      this.rotate = this.rotate.bind(this);
    }
  
    static propTypes = {
      className: PropTypes.string,
      options: PropTypes.array,
      baseSize: PropTypes.number,
      spinAngleStart: PropTypes.number,
      spinTimeTotal: PropTypes.number,
      onComplete: PropTypes.func,
    };
  
    static defaultProps = {
      options:  [
        'PIERDES 1 PUNTOS',
        '¿S M Q U N D P?',
        '¿CONOCES A TUS COMPAÑEROS?',
        '¿QUIÉN ES QUIÉN?',
        'AL PIE DE LA LETRA',
        'PIERDES 1 PUNTO',
        'AL PIE DE LA LETRA',
        '¿CONOCES A TUS COMPAÑEROS?',
        'PIERDES TU TURNO',
        '¿S M Q U N D P?', /*COMIENZO*/ 
        '¿QUIÉN ES QUIÉN?',
        'PIERDES TU TURNO',
        ],
      colors: [
        '#DCD080',
        '#84C7B5',
        '#EFB73A',
        '#DDE8BC',
        '#196F58',
        '#EB6C7F',
        '#DCD080',
        '#84C7B5',
        '#EFB73A',
        '#DDE8BC',
        '#196F58',
        '#EB6C7F',
      ],
      text_colors: [
        '#AC4424',
        '#DDE8BC',
        '#DDE8BC',
        '#196F58',
        '#DDE8BC',
        '#DDE8BC',
        '#196F58',
        '#DDE8BC',
        '#DDE8BC',
        '#EB6C7F',
        '#DDE8BC',
        '#DDE8BC',
      ],
      baseSize: 500,
      spinAngleStart: Math.random() * 10 + 10,
      spinTimeTotal: Math.random() * 3 + 4 * 1000,
    };
  
    componentDidMount() {
      this.drawRouletteWheel();
    }
    
    //BYTE TO HEX
    byte2Hex(n) {
      const nybHexString = '0123456789ABCDEF';
      return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
    }
    
    RGB2Color(r,g,b) {
      return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
    }
  
    getColor(item, maxitem) {
      const phase = 0;                                    
      const center = 128;
      const width = 128;
      const frequency = Math.PI*2/maxitem;
      
      const red = Math.sin(frequency*item+2+phase) * width + center;
      const green = Math.sin(frequency*item+0+phase) * width + center;
      const blue  = Math.sin(frequency*item+4+phase) * width + center;
      
      return this.RGB2Color(red,green,blue);
    }
  
    drawRouletteWheel() {
      const { options, baseSize, colors, text_colors } = this.props;
      let { startAngle, arc } = this.state;
      
      // const spinTimeout = null;
      // const spinTime = 0;
      // const spinTimeTotal = 0;
      
      let ctx;
      const canvas = this.refs.canvas;
      
      
      
      if (canvas.getContext) {
        const insideRadius = baseSize - 55;
  
        ctx = canvas.getContext('2d');
        
        ctx.clearRect(0,0,800,800);

        // Textos
        ctx.font = '30px Verifont';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
       
   
        for (let i = 0; i <colors.length; i++) {
          const angle = startAngle + i * arc;
          
          ctx.fillStyle = colors[i]
           
          //Dibujo de ruleta!
          ctx.beginPath();
          ctx.arc(baseSize, baseSize, 5 /*outsideRadius*/, angle, angle + arc, false);
          ctx.arc(baseSize, baseSize, insideRadius, angle + arc, angle, true);
          ctx.fill();
          ctx.save();
          //ctx.fillStyle = 'white';
          ctx.fillStyle = text_colors[i];
          
          ctx.translate(baseSize + Math.cos(angle + arc / 2) * /*textRadius*/ 260, 
                        baseSize + Math.sin(angle + arc / 2) * /*textRadius*/ 260);
          //ctx.rotate(angle + arc / 2 + Math.PI / 2);
          ctx.rotate(angle + arc / 22.5 + Math.PI / 22.5);
          const text = options[i];
          ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
          ctx.restore();          
        }
  
        //Arrow
        ctx.fillStyle = 'red';
        ctx.beginPath();
        //ctx.lineTo(baseSize + 10, baseSize - (outsideRadius + 20));
        //ctx.lineTo(baseSize + 0, baseSize - (outsideRadius - 5));
        //ctx.lineTo(baseSize - 10, baseSize - (outsideRadius + 20));
        ctx.lineTo(baseSize + 10, baseSize - (540 + 20));
        ctx.lineTo(baseSize + 0, baseSize - (540 - 5));
        ctx.lineTo(baseSize - 10, baseSize - (540 + 20));
        ctx.fill();
        ctx.stroke();
      }
    }
  
    spin() {
      //CLEAR RESULT
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0,1000,1200,200);

      //SPIN FUNCTION
      this.spinTimer = null;

      // RANDOM SPIN
      const random = Math.floor(Math.random() * (30 - 15)) + 15;
      this.setState({ spinTime: 0 + 5, random: random }, () => this.rotate());
      console.log(this.state.random)
    }
  
    rotate(){
      
      const { spinAngleStart, spinTimeTotal } = this.props;
      if(this.state.spinTime > 2800) {
        clearTimeout(this.spinTimer);
        this.stopRotateWheel();
      } else {
        const spinAngle = spinAngleStart - this.easeOut(this.state.spinTime, 0, spinAngleStart, spinTimeTotal);
        this.setState({
          startAngle: this.state.startAngle + spinAngle * Math.PI / 180,
          spinTime: this.state.spinTime + this.state.random,
        }, () => {
          this.drawRouletteWheel();
          clearTimeout(this.spinTimer);
          this.spinTimer = setTimeout(() => this.rotate(), 30);
        })
        console.log(this.state.random)
      }
    }
  
    stopRotateWheel() {
      let { startAngle, arc } = this.state;
      const { options, baseSize } = this.props;
      
      const img = new Image ()
      img.src = '../img/VALE.psd';
      
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext('2d');
  
      const degrees = startAngle * 180 / Math.PI + 90;
      const arcd = arc * 180 / Math.PI;
      const index = Math.floor((360 - degrees % 360) / arcd);
      ctx.save();
      
      ctx.font = 'bold 50px Verifont';
      const text = options[index]
      console.log(text)

      // ctx.drawImage(img,0,0,100,100);
      ctx.fillText(text, baseSize - ctx.measureText(text).width / 2, 1100);

      ctx.restore();
     
      // this.getIp (text)
      // mongo.create (text)   
      // this.props.onComplete(text);
    }
  
    easeOut(t, b, c, d) {
      const ts = (t/=d)*t;
      const tc = ts*t;
      return b+c*(tc + -3*ts + 3*t);
    }
  
    handleOnClick() {
      this.spin();
    }

    getIp (text, ip) {
      const publicIp = require('public-ip');
 
      (async () => {
        const ip = await publicIp.v4();
      console.log(await publicIp.v4());
      
      console.log(text,ip)
      mongo.create (text, ip) 
    })();
     
    }
  
    render() {
      
      const { baseSize } = this.props;
        
      return (
        <div className='background'>
          <Nav/>
            <div className="roulette">
              <img src={logojuegos} alt="veri" style={{width: '45%', margin: ' 0 auto', padding: '0 0 5rem 0'}}></img>
              {/* <h1 style={{fontSize: '5rem', margin: '6rem 0 0 0'}}>LOS VERIJUEGOS DEL HAMBRE</h1>  */}
              <div className="roulette-container">
                <canvas ref="canvas" width={baseSize * 2} height={baseSize * 2.5} className="roulette-canvas"></canvas>
            </div>
            <div className="roulette-container">
              <Button 
                variant="success"
                value="spin" 
                onClick={this.handleOnClick} 
                className="button"  
                style={{
                  fontFamily:'Verifont',
                  fontSize:'50px',
                  margin: '5rem 0',
                  padding: '50px 25px 50px 25px',
                  borderRadius: '120px',
                }} 
                id="spin">
                GIRAR!!
              </Button>
            </div>
          </div>
        </div>
      );
    };
  };
  export default Canvas;