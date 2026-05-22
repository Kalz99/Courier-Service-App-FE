import { useState, useEffect } from 'react';
import type { ShipmentItem } from '../components/ui';

const MOCK_SHIPMENTS_DATA: ShipmentItem[] = [
  {
    id: '1',
    trackingNumber: 'TRK-98234-X',
    recipient: {
      name: 'John Doe',
      mobile: '+1 (555) 234-5678',
      address: '123 Pine Street, Apt 4B, Seattle, WA 98101'
    },
    packageType: 'document',
    packageName: 'Important Legal Docs',
    status: 'delivered',
    date: '2026-05-22',
    weight: '0.4 kg'
  },
  {
    id: '2',
    trackingNumber: 'TRK-48102-Y',
    recipient: {
      name: 'Sarah Connor',
      mobile: '+1 (555) 876-5432',
      address: '742 Evergreen Terrace, Springfield, OR 97477'
    },
    packageType: 'package_box',
    packageName: 'Standard Package / Box',
    status: 'in_transit',
    date: '2026-05-21',
    weight: '4.2 kg'
  },
  {
    id: '3',
    trackingNumber: 'TRK-30291-A',
    recipient: {
      name: 'Bruce Wayne',
      mobile: '+1 (555) 999-1111',
      address: '1007 Mountain Drive, Gotham City, NJ 07001'
    },
    packageType: 'pallet',
    packageName: 'Industrial Bulk Crates',
    status: 'pending',
    date: '2026-05-22',
    weight: '120.0 kg'
  },
  {
    id: '4',
    trackingNumber: 'TRK-88231-Z',
    recipient: {
      name: 'Peter Parker',
      mobile: '+1 (555) 444-2222',
      address: '20 Ingram Street, Queens, NY 11375'
    },
    packageType: 'medical',
    packageName: 'Pharmaceutical / Vaccine Pack',
    status: 'out_for_delivery',
    date: '2026-05-22',
    weight: '1.8 kg'
  },
  {
    id: '5',
    trackingNumber: 'TRK-10928-B',
    recipient: {
      name: 'Tony Stark',
      mobile: '+1 (555) 300-3000',
      address: '10880 Malibu Point, Malibu, CA 90265'
    },
    packageType: 'perishable',
    packageName: 'Perishable Gourmet Food',
    status: 'delivered',
    date: '2026-05-20',
    weight: '3.5 kg'
  },
  {
    id: '6',
    trackingNumber: 'TRK-77123-K',
    recipient: {
      name: 'Clark Kent',
      mobile: '+1 (555) 777-8888',
      address: '344 Clinton Street, Apt 3B, Metropolis, NY 10001'
    },
    packageType: 'document',
    packageName: 'Press Release Envelopes',
    status: 'in_transit',
    date: '2026-05-22',
    weight: '0.2 kg'
  },
  {
    id: '7',
    trackingNumber: 'TRK-55248-L',
    recipient: {
      name: 'Diana Prince',
      mobile: '+1 (555) 123-0987',
      address: 'Gateway City Museum, Washington, DC 20004'
    },
    packageType: 'package_box',
    packageName: 'Fragile Antique Vase',
    status: 'pending',
    date: '2026-05-21',
    weight: '8.7 kg'
  }
];

export const useCustomerShipments = () => {
  const [shipments, setShipments] = useState<ShipmentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      try {
        setShipments(MOCK_SHIPMENTS_DATA);
        setError(null);
      } catch (err) {
        setError('Failed to fetch shipments data. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const refreshShipments = () => {
    setLoading(true);
    setTimeout(() => {
      setShipments(MOCK_SHIPMENTS_DATA);
      setLoading(false);
    }, 500);
  };

  return {
    shipments,
    loading,
    error,
    refreshShipments,
  };
};

export default useCustomerShipments;
