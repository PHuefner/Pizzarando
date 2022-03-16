import java.util.ArrayList;
import java.util.Date;

public class Bestellung {
    private int bestellNr, posNr;
    private Date datum;
    private ArrayList<Bestellposition> bestellposition;

    public Bestellung(int bestellNr, int posNr, Date datum){
        this.bestellNr = bestellNr;
        this.posNr = posNr;
        this.datum = datum;
        bestellposition = new ArrayList<>();
    }    

    public void hinzufuegenBestellposition(Pizza pizza, int menge){
        bestellposition.add(new Bestellposition((bestellposition.size()+1), menge, this, pizza));
    }

    public double berechneSumme(){
        int gesamtpreis = 0;
        for(int i = 0; i < bestellposition.size(); i++){
            gesamtpreis += (bestellposition.get(i)).getMenge() * (bestellposition.get(i)).getPizza().getPreis();
        }
        return gesamtpreis;
    }

    public String toString(){
        return null;
    }

    public ArrayList<Bestellposition> getBestellposition() {
        return bestellposition;
    }
}
