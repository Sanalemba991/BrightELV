// Test script to verify Supabase connection and tables
// Run with: npx ts-node --skip-project scripts/test-supabase.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sdfjypdcqrqtivluwjxg.supabase.co';
const supabaseKey = 'sb_publishable_MWhNkik1zUApfvPEkgrg1g_Sl8Fbc8p';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log('🔍 Testing Supabase connection...\n');

    const tables = [
        'categories',
        'subcategories', 
        'products',
        'contacts',
        'subscriptions',
        'product_enquiries',
        'product_inquiries'
    ];

    for (const table of tables) {
        try {
            const { data, error, count } = await supabase
                .from(table)
                .select('*', { count: 'exact', head: true });

            if (error) {
                console.log(`❌ ${table}: ERROR - ${error.message}`);
            } else {
                console.log(`✅ ${table}: OK (${count ?? 0} rows)`);
            }
        } catch (err: any) {
            console.log(`❌ ${table}: ERROR - ${err.message}`);
        }
    }

    console.log('\n✨ Test complete!');
}

testConnection();
