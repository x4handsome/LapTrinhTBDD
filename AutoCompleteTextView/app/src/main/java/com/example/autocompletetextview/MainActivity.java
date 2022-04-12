package com.example.autocompletetextview;

import android.app.Activity;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
public class MainActivity extends Activity {
    private AutoCompleteTextView autoCompleteTextView;
    private String[] nationLanguage = {"VietNam","Vantican", "Indo", "ThaiLan", "Campu", "Laos"};
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        autoCompleteTextView = (AutoCompleteTextView) findViewById(R.id.Nation);
        ArrayAdapter adapternationLanguage = new ArrayAdapter(this, android.R.layout.simple_list_item_1, nationLanguage);
        autoCompleteTextView.setAdapter(adapternationLanguage);
        autoCompleteTextView.setThreshold(1);
    }
}