import java.util.ArrayList;

class Verwaltung{
    private boolean geoeffnet;
    private ArrayList<Bestellung> bestellungen;
    private ArrayList<Koch> koeche;

    public Verwaltung(){
        bestellungen = new ArrayList<>();
        koeche = new ArrayList<>();
    }
   
    public boolean einfuegen(Bestellung neu){
        return bestellungen.add(neu);
    }

    public Bestellung entnehemen(){
        Bestellung b = bestellungen.get(0);
        bestellungen.remove(bestellungen.get(0));
        return b;
    }

    public void schließen(){
        geoeffnet = false;
    }

    public void oeffnen(){
        geoeffnet = true;
    }

    public String toString() {
        return null;
    }
}