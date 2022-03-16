public class Bestellposition {
    private int posNr, menge;
    private Bestellung bestellung;
    private Pizza pizza;

    public Bestellposition(int posNr, int menge, Bestellung bestellung, Pizza pizza){
        	this.posNr = posNr;
            this.menge = menge;
            this.bestellung = bestellung;
            this.pizza = pizza;
    }

    public String toString(){
        return null;
    }

    public int getMenge() {
        return menge;
    }
    public Pizza getPizza() {
        return pizza;
    }
}